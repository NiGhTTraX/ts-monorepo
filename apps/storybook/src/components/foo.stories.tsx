import type { Meta, StoryObj } from "@storybook/react-vite";
import { Foo } from "./foo";

const meta = {
  component: Foo,
} satisfies Meta<typeof Foo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
