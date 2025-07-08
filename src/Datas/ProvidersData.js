import img1 from "../Asstes/Services/AC Repair man.jpg";
import img2 from "../Asstes/Services/Car Repair man.jpg";
import img3 from "../Asstes/Services/Cleaning man.jpg";
import img4 from "../Asstes/Services/hair cutting man.png";
import img5 from "../Asstes/Services/Home repair man.jpg";
import img6 from "../Asstes/Services/Plumbing man.jpg";
import img7 from "../Asstes/Services/Electrical Worker man.jpg";
import img8 from "../Asstes/Services/Carpentry man.jpg";

const providers = [
  {
    id: 1,
    job: "AC Repair",
    name: "Amit Sharma",
    phone: "9876543210",
    email: "amit@example.com",
    image: img1, // ✅ Use variable, not string
  },
  {
    id: 2,
    name: "Ramu",
    job: "Car Mechanic",
    phone: "9123456789",
    email: "ramu@example.com",
    image: img2, // ✅ You can assign different image
  },
  {
    id: 3,
    name: "Raju Patel",
    job: "Home Cleaning Expert",
    phone: "9123456789",
    email: "raju@example.com",
    image: img3, // ✅ You can assign different image
  },
  {
    id: 4,
    name: "Ram ",
       job: "hair cutting Expert",
    phone: "9123456789",
    email: "Ram@example.com",
    image: img4, // ✅ You can assign different image
  },
  {
    id: 5,
    name: "Rahul rajput",
    job: "Home repairing Expert",
    phone: "9123456789",
    email: "rahul@example.com",
    image: img5, // ✅ You can assign different image
  },
  
{
    id: 6,
    name: "Ravi kumar patel",
    job: "Wroker Expert Plumbing",
    phone: "9123456789",
    email: "ravi@example.com",
    image: img6, // ✅ You can assign different image
  },
  {
    id: 7,
    name: "Roy sing",
     job: "Electrical Worker Expert",
    phone: "9123456789",
    email: "roy@example.com",
    image: img7, // ✅ You can assign different image
  },
  {
    id: 8,
    name: "Ritik yadv",
    job: "Carpentry Wroker Expert",
    phone: "9123456789",
    email: "ritik@example.com",
    image: img8, // ✅ You can assign different image
  },
  
];

export default providers;
