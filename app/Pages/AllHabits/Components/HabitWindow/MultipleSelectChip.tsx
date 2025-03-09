import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
// import { Area } from "recharts";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({
  onChange,
}: {
  onChange: (selectedAreasItems: unknown) => void;
}) {
  const theme = useTheme();
  const {
    allAreasObject,
    darkModeObject,
    selectedItemsObject,
    habitWindowObject,
  } = useGlobalContextProivder();
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { openHabitWindow } = habitWindowObject;
  const { selectedItems } = selectedItemsObject;
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
  const [selectedAreasItems, setSelectedAreasItems] = React.useState<unknown>(
    []
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //Filter out the "All" element
  const filteredAreas = allAreas
    ? allAreas.filter((area) => area.name !== "All")
    : [];

  //This useEffect enable us to save the whole object matches the name is the selectedAreas array
  React.useEffect(() => {
    const selectedAreaObjects = allAreas
      ? selectedAreas.map((selectedAreas) =>
          allAreas.find((area) => area.name === selectedAreas)
        )
      : [];

    setSelectedAreasItems(selectedAreaObjects);
  }, [selectedAreas]);

  //use the callback function onChange to pass up the the selectedAreasItems to the parent
  //everytime the selectedAreasItems updates
  React.useEffect(() => {
    onChange(selectedAreasItems);

    // console.log(selectedAreas);
  }, [selectedAreasItems]);

  React.useEffect(() => {
    //If we want to edit a habit
    if (selectedItems) {
      const habitSelected = selectedItems as HabitType;
      const { areas } = habitSelected;

      const selectedAreas = areas ? areas.map((area) => area.name) : [];

      setSelectedAreas(selectedAreas);
    } else {
      //when we open the habit window, empty the selectedAreas
      setSelectedAreas([]);
    }
  }, [openHabitWindow]);

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          "& .Mui-focused .MuiInputLable-root": { color: defaultColor.default },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultColor.default,
          },
        }}
      >
        <InputLabel
          sx={{
            color: isDarkMode ? "white" : "",
            "&.Mui-focused": { color: defaultColor.default },
          }}
          id="demo-multiple-chip-label"
        >
          Choose Your Area...
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedAreas}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode
                    ? defaultColor.default
                    : defaultColor.default,
                },
              }}
              label="Choose your area..."
            />
          }
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: isDarkMode
                      ? defaultColor.default
                      : defaultColor.default,
                    color: isDarkMode ? darkModeColor.textColor : "white",
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredAreas.map((area) => (
            <MenuItem
              key={area._id}
              value={area.name}
              style={getStyles(area.name, selectedAreas, theme)}
            >
              <FontAwesomeIcon
                className="text-red-500"
                icon={area.icon}
                style={{ marginRight: 8 }}
              />
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
