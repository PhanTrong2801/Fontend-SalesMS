import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import api from "../api/api";

export default function ProductList(){
    const [products, setProducts] = useState([]);

    const load = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    useEffect(() => { load();});

    const remove = async (id) =>{
        if(confirm("Xoa san pham nay?")){
            await api.delete(`/product/${id}`);
            setProducts(products.filter((p) => p.productId != id));
        }
    };

    return (
        <div>
            <div className="header">
                <h2>Quan ly san pham</h2>
                <Link to="/products/new"><button>Them moi</button></Link>
            </div>

            <table className="table">
                <thead><tr><th>ID</th><th>Ten</th><th>SKU</th><th>Gia</th><th>Hanh dong</th></tr></thead>
                <tbody>
                    {products.map(p =>(
                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.name}</td>
                            <td>{p.sku}</td>
                            <td>{p.salePrice}</td>
                            <td>
                                <Link to={`/products/${p.productId}`}><button>Sua</button></Link>
                                <button onClick={() => remove(p.productId)} className="btn-danger">Xoa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}