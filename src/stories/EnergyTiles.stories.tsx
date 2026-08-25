import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EnergyTiles } from "@/components/magnitude/EnergyTiles";
import { energyRatio } from "@/lib/magnitude";
import { darkCanvas } from "./decorators";

type StoryArgs = { delta: number };

const meta = {
  title: "Magnitude/EnergyTiles",
  parameters: { layout: "fullscreen" },
  args: { delta: 1 },
  argTypes: {
    delta: { control: { type: "range", min: -3, max: 3, step: 0.1 } },
  },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 480 })],
  render: ({ delta }: StoryArgs) => (
    <EnergyTiles ratio={energyRatio(0, delta)} />
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneUnit: Story = {};

export const TwoUnits: Story = { args: { delta: 2 } };

export const ALarger: Story = { args: { delta: -1 } };

export const Capped: Story = { args: { delta: 3 } };
