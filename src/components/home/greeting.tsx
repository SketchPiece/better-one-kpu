import { useEffect, useState } from "react";

interface GreetingProps {
  name?: string;
}

function defineGreeting(name?: string): string {
  if (!name) return "Discover Services";
  const hours = new Date().getHours();
  let greet;

  if (hours < 12) {
    greet = `Good morning, ${name}`;
  } else if (hours < 18) {
    greet = `Good afternoon, ${name}`;
  } else {
    greet = `Good evening, ${name}`;
  }

  return greet;
}

function Greeting({ name }: GreetingProps): JSX.Element {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(defineGreeting(name));
  }, [name]);

  return <h1 className="text-3xl font-medium md:text-4xl">{greeting}</h1>;
}

export default Greeting;
