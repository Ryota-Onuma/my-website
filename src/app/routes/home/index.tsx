import { useContext } from "react";
import { ThemeContext } from "@/app/providers/theme";

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;
  return (
    <div>
      <h1>Home</h1>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Change theme</button>
    </div>
  );
};

export default Home;
