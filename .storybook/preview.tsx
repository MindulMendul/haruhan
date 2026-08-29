import type { Preview } from "@storybook/react-native-web-vite";
import "../src/app/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fbfcff" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
};

export default preview;
