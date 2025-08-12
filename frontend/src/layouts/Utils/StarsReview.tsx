/**
 * @author Luka Baturić
 * @date 12/08/2025
 */

import { FC } from "react";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

interface IProps {
   rating: number;
   size: number;
}

const StarsReview: FC<IProps> = ({ rating, size }) => {
   const normalized = Math.min(Math.max(rating, 0), 5);

   const starTypes = Array.from({ length: 5 }, (_, i) => {
      const diff = normalized - i;

      switch (true) {
         case diff >= 1:
            return <StarFill key={i} color="gold" size={size} />;
         case diff >= 0.5:
            return <StarHalf key={i} color="gold" size={size} />;
         default:
            return <Star key={i} color="gold" size={size} />;
      }
   });

   return <>{starTypes}</>;
}


export { StarsReview };