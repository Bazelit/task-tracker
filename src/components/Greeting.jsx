import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      setTimeOfDay("🌅Good morning!");
    } else if (currentTime >= 12 && currentTime < 18) {
      setTimeOfDay("☀️Good afternoon!");
    } else if (currentTime >= 18 && currentTime < 24) {
      setTimeOfDay("🌙Good evening!");
    } else {
      setTimeOfDay("🌃Good night!");
    }
  }, []);

  return <p className="text-2xl font-bold py-4 pl-6">{timeOfDay}</p>;
};

export default Greeting;
