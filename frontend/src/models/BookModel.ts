/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

interface IBookModel {
  id: number;
  title: string;
  author?: string;
  description?: string;
  copies?: number;
  copiesAvailable?: number;
  category?: string;
  img?: string;
}

export default IBookModel;