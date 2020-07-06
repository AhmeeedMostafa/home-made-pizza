import React, { memo, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Heading } from '../heading/heading.component';
import {
	StyledCartWrapper,
	StyledCartList,
	StyledCartItem,
	StyledControlsWrapper,
	StyledCartItemTitle,
	StyledCartIncreaseButton,
	StyledCartDecreaseButton,
	StyledCartItemPrice,
	StyledDeleteButton,
	StyledCartCheck,
	StyledCartError,
	StyledCartEmptyMessage,
	StyledCartHeader,
	StyledCartContent,
} from './cart.styles';
import { cartStub } from './cart.stub';

const CartComponent = ({
	cartState = cartStub,
	onAddToCart = () => null,
	onDeleteFromCart = () => null,
	onRemoveFromCart = () => null,
	children,
	isOrderSent,
	isError,
	isOrderSubmitError,
	isOrderSending,
}) => {
	const cartSum = useMemo(() => cartState.cart.reduce((acc, elem) => acc + elem.price * elem.count, 0), [cartState]);

	return (
		<StyledCartWrapper>
			<StyledCartHeader>
				<Heading>Корзина</Heading>
			</StyledCartHeader>
			<StyledCartContent>
				{cartState.cart.length > 0 ? (
					<>
						<StyledCartList>
							{cartState.cart.map((item) => (
								<StyledCartItem key={uuidv4()} id="cart-item">
									<StyledCartItemTitle id="cart-item-name">{item.productName}</StyledCartItemTitle>
									<StyledControlsWrapper>
										<StyledCartDecreaseButton onClick={onRemoveFromCart(item)} id="cart-item-decrease-button" />
										<span id="cart-item-count">{item.count}</span>
										<StyledCartIncreaseButton onClick={onAddToCart(item)} id="cart-item-increase-button" />
									</StyledControlsWrapper>
									<StyledCartItemPrice id="cart-item-price">{`${item.price} ₽`}</StyledCartItemPrice>
									<StyledDeleteButton onClick={onDeleteFromCart(item)} id="cart-item-delete-button" />
								</StyledCartItem>
							))}
						</StyledCartList>
						{isError && (
							<StyledCartError id="cart-validation-message">
								К сожалению, за один раз мы не сможем доставить больше 5 пицц и больше 4 напитков
							</StyledCartError>
						)}
						<StyledCartCheck>
							{'Сумма заказа: '}
							<b id="cart-total-sum">{`${cartSum} ₽`}</b>
						</StyledCartCheck>
						{children}
					</>
				) : isOrderSending ? (
					<StyledCartEmptyMessage>Оформление заказа...</StyledCartEmptyMessage>
				) : isOrderSent ? (
					<StyledCartEmptyMessage>Заказ отправлен, спасибо!</StyledCartEmptyMessage>
				) : isOrderSubmitError ? (
					<StyledCartEmptyMessage>Произошла ошибка, пожалуйста, попробуйте еще раз</StyledCartEmptyMessage>
				) : (
					<StyledCartEmptyMessage>Корзина пуста</StyledCartEmptyMessage>
				)}
			</StyledCartContent>
		</StyledCartWrapper>
	);
};

export const Cart = memo(CartComponent);
