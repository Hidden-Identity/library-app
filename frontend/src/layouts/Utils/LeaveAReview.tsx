/**
 * @author Luka Baturić
 * @date 02/02/2026
 */

import { FC, useState } from "react";
import { Button, Dropdown, Form, Stack } from "react-bootstrap";
import { StarsReview } from "./StarsReview";
import { useTranslation } from "react-i18next";

interface IProps {
   submitReview: (rating: number, description: string) => Promise<void>;
}

const STAR_VALUES = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const LeaveAReview: FC<IProps> = ({ submitReview }) => {
   const { t } = useTranslation();

   const [rating, setRating] = useState(0);
   const [showForm, setShowForm] = useState(false);
   const [description, setDescription] = useState("");

   const handleStarSelect = (value: number) => {
      setRating(value);
      setShowForm(true);
   };

   return (
      <Stack gap={1}>
         <Dropdown>
            <Dropdown.Toggle as={"h5"} style={{ cursor: "pointer" }}>
               {t('submit_review')}?
            </Dropdown.Toggle>

            <Dropdown.Menu>
               {STAR_VALUES.map((value) => (
                  <Dropdown.Item
                     key={value}
                     onClick={() => handleStarSelect(value)}
                  >
                     {value} star{value === 1 ? "" : "s"}
                  </Dropdown.Item>
               ))}
            </Dropdown.Menu>
         </Dropdown>
         <StarsReview rating={rating} size={32} />
         {showForm && (
            <>
               <hr />
               <Form>
                  <Form.Group className="mb-3">
                     <Form.Label>{t('description')}</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={t('optional')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </Form.Group>

                  <Button
                     variant="primary"
                     onClick={() => submitReview(rating, description)}
                  >
                     {t('submit_review')}
                  </Button>
               </Form>
            </>
         )}
      </Stack>
   );
};

export { LeaveAReview };