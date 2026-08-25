import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  SeismographStylus,
  relativeAmpsFromMags,
} from "@/components/seismograph/SeismographStylus";
import { darkCanvas } from "./decorators";

type StoryArgs = {
  magA: number;
  magB: number;
  embedded?: boolean;
  jagged?: boolean;
};

const meta = {
  title: "Seismograph/Stylus",
  parameters: { layout: "fullscreen" },
  args: {
    magA: 5,
    magB: 7,
    embedded: false,
    jagged: false,
  },
  argTypes: {
    magA: { control: { type: "range", min: 0, max: 10, step: 0.1 } },
    magB: { control: { type: "range", min: 0, max: 10, step: 0.1 } },
    embedded: { control: "boolean" },
    jagged: { control: "boolean" },
  },
  decorators: [(Story) => darkCanvas(Story)],
  render: ({ magA, magB, embedded = false, jagged = false }) => {
    const { ampA, ampB } = relativeAmpsFromMags(magA, magB);
    return (
      <SeismographStylus
        magA={magA}
        magB={magB}
        ampA={ampA}
        ampB={ampB}
        embedded={embedded}
        jagged={jagged}
      />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiveVsSeven: Story = {};

export const OneUnit: Story = {
  args: { magA: 5, magB: 6 },
};

export const GreatVsLarge: Story = {
  args: { magA: 7, magB: 9 },
};

/** Same chrome + smooth traces used inside MagnitudeCompare. */
export const EmbeddedInCompare: Story = {
  args: { magA: 5, magB: 7, embedded: true, jagged: false },
};

export const Jagged: Story = {
  args: { magA: 5, magB: 7, jagged: true },
};
