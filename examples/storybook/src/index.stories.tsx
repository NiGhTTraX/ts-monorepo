import { Button } from "@nighttrax/components/button";
import React from "react";
import { Foo } from "./components/foo";

export default {
  title: "Index",
};

export const Local = () => <Foo />;

export const Monorepo = () => <Button />;
