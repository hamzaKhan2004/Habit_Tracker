// import connectToDB from "@/app/lib/connectToDB";

// export async function POST(req: Request) {
//   const newUser = {
//     clerkUserId: id,
//     emailAddress: email_addresses[0].email_address,
//   };
//   console.log(newUser);
//   try {
//     await connectToDB();
//     await User.create(newUser);
//     console.log("user created");
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
//   console.log("Webhook body:", body);

//   return new Response("", { status: 200 });
// }
