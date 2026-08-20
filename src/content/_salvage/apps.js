// Apps page content.
// Add an entry per app. `videoLink` should be a YouTube *embed* URL
// (e.g. "https://www.youtube.com/embed/VIDEO_ID") or null if there's no video.
// `moreLink` is any external link (or null).

export const apps = [
  {
    id: "food-companion",
    name: "Food Companion",
    text: "This project was done for the hackathon MediHacks and I collaborated with 3 other developers. Our app relieves the responsibility of doctors needing to send meal options to patients manually, and instead automates the whole process. Doctors can interact with a server to assign diets to a condition, and patients can interact with the Android app to view what they can eat and track their nutrition.",
    moreLink: "https://devpost.com/software/food-companion",
    videoLink: "https://www.youtube.com/embed/SjmDGPgLb4U",
  },
  {
    id: "tadds-museum",
    name: "Tadd's Museum",
    text: "Tadd's Museum is a solo project I built in Unreal Engine 5 featuring my own accomplishments. It is much like this website except it is interacted with in a first-person format, and I designed a museum using Blender to store all of my accomplishments. The video is a walkthrough of how the project works if you don't want to download it.",
    moreLink: "https://drive.google.com/drive/u/1/folders/1ymg5FdHVHq-aTg91Tt48QUZlai7MxG9I",
    videoLink: "https://www.youtube.com/embed/cfMNoveVYeo?si=Pp_2_Vzm1e5WaaAz",
  },
  {
    id: "dr-mario",
    name: "Dr. Mario",
    text: "Re-imagined the Dr. Mario game with custom audio and difficulties using MIPS assembly.",
    moreLink: "https://github.com/tdM05/DrMario",
    videoLink: null,
  },
  {
    id: "full-stack-chef",
    name: "Full Stack Chef",
    text: "Recipe finder, grocery list generator and more!",
    moreLink: "https://github.com/tdM05/FullStackChef",
    videoLink: null,
  },
];
