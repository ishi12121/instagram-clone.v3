import minifaker, { arrayElement } from 'minifaker'
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import Story from "./Story";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);
  return (
<div className="flex space-x-2 p-6 bg-gray-100 mt-8 border border-gray-300 rounded-sm overflow-x-scroll scrollbar-none">
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}