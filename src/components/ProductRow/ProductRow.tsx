import { Product } from "../../models/Inventory.model";
import { ParserNumber } from "../../utils";
import { useCart } from "../../hooks/useCart";
import { BiAddToQueue } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

type ProductRowProps = {
	product: Product;
	handleEdit: (product: Product) => void;
};

const ProductRow = ({ product, handleEdit }: ProductRowProps) => {
	const { quantity, handleChange, handleAddCart } = useCart();
	const enableAdd = quantity > 0;

	return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td className="text-center">{ParserNumber.colDecimals(product.price)} $</td>
            <td className="text-center">{product.stock}</td>
            <td className="quantity-cell">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleChange(e)}
                    max={product.stock}
                    min={1}
                />
            </td>
            <td className="action-cell">
                <button disabled={!enableAdd} onClick={() => handleAddCart(product)}>
                    <BiAddToQueue />
                </button>
                <button onClick={() => handleEdit(product)}>
                    <FaRegEdit />
                </button>
            </td>
        </tr>
	);
};

export default ProductRow;
