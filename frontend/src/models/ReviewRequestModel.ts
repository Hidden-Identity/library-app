/**
 * @author Luka Baturić
 * @date 02/02/2026
 */

class ReviewRequestModel {
  constructor(
    public rating: number,
    public bookId: number,
    public reviewDescription?: string
  ) {}
}

export default ReviewRequestModel;