/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { FC } from "react"
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Carousel } from "./components/Carousel";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

const HomePage: FC = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  )
}

export default HomePage;