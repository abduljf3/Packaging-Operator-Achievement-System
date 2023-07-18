import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = format(currentDate, "dd MMMM yyyy, HH:mm:ss a", {
    locale: id,
  });

  return (
    <div className="w-full flex justify-end container mx-auto py-5">
      <h1 className="font-semibold text-xl">
        {formattedDate}
      </h1>
    </div>
  );
}
