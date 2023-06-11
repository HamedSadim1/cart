import CartItem from "./CartItem";
import useCartQueryStore from "../store";

const CartContainer = () => {
  const carts = useCartQueryStore((s) => s.cartQuery.carts);

  const total = useCartQueryStore((s) => s.cartQuery.total);

  const clearCart = useCartQueryStore((s) => s.clearCart);

  if (!carts || carts.length == 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {carts.map((cart) => {
          return <CartItem key={cart.id} cart={cart} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => clearCart()}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
