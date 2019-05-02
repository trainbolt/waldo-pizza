import React from 'react';
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

// Import Actions
import { addToCart, removeFromCart } from '../actions/cart';

class Build extends React.Component {

	defaultSize = 'medium';
	defaultSelectedToppings = this.props.toppingsBySize[this.defaultSize].map((t) => {
		return t.defaultSelected ? t.topping : false;
	}).filter((t) => t !== false);

	defaultState = {
		selectedSize: this.defaultSize,
		selectedToppings: this.defaultSelectedToppings,
		maxToppings: this.props.pizzasBySize[this.defaultSize].maxToppings
	};

	constructor(props) {
		super(props);
		this.state = this.defaultState;
	}

	capitalize = (str) => {
		return str.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
	};

	onChangeSize = (size) => {
		if (this.state.selectedSize !== size) {

			let selectedToppings = [];
			this.props.toppingsBySize[size].map((t) => {
				return t.defaultSelected ? selectedToppings.push(t.topping) : false;
			});

			this.setState({
				selectedSize: size,
				selectedToppings,
				maxToppings: this.props.pizzasBySize[size].maxToppings
			});
		}
	};

	onChangeTopping = (topping) => {
		const { pizzasBySize } = this.props;
		const { selectedSize, selectedToppings } = this.state;
		const maxToppings = pizzasBySize[selectedSize].maxToppings || pizzasBySize[selectedSize].toppings.length;
		const maxNotReached = selectedToppings.length < maxToppings;
		const beingRemoved = selectedToppings.indexOf(topping) > -1;

		if (maxNotReached || beingRemoved) {
			this.setState(state => {
				const newSelectedToppings = !beingRemoved
					?
					state.selectedToppings.concat(topping)
					:
					state.selectedToppings.filter((item) => topping !== item)
					;

				// Other things like price update go in here

				return {
					selectedToppings: newSelectedToppings
				};
			});
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { selectedSize, selectedToppings } = this.state;
		const { pizzasBySize } = this.props;
		this.props.addToCart({
			id: Date.now(),
			size: selectedSize,
			price: pizzasBySize[selectedSize].basePrice,
			toppings: selectedToppings
		});
		this.setState(this.defaultState);
	};

	getCartTotal = () => {
		const { pizzas } = this.props.cart;

		return pizzas.reduce((acc, p) => {
			return acc + p.price + p.toppings.reduce((acc, t) => {
				return acc + t.price;
			}, 0);
		}, 0).toFixed(2);

	};

	render() {
		const { selectedSize, selectedToppings } = this.state;
		const { pizzasBySize, toppingsBySize, pizzaSizes, giphy, cart } = this.props;
		const pizzaGif = giphy.randomPizzaGif;
		const bg = pizzaGif ? pizzaGif.images.original.url : null;

		return (
			<div>
				<CartMessage>
					Buy 2 Get 1 Free Starts Sunday!
				</CartMessage>
				<Wrapper style={{ background: "black" }}>
					<Background style={{ backgroundImage: `url(${bg})` }} />
					<Hero>
						<JumboHeading>If We Build It</JumboHeading>
						<JumboSubheading>They will eat!</JumboSubheading>
					</Hero>
				</Wrapper>
				<Wrapper>
					<Container>
						<Row style={{ padding: "50px 0" }}>
							<Col md={9} sm={8} xs={12} style={{ marginBottom: 50 }}>
								<h3 style={{ marginBottom: 30 }}>Build Your Ultimate Pizza!</h3>
								<Form>

									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label style={{ display: 'block' }}>Size</Form.Label>
											<Row>
												{ pizzaSizes.map((size, index) => (
													<Col md={3} sm={4} xs={6} key={index}>
														<Form.Check
															inline
															label={
																<span style={{ fontSize: 14, position: 'relative' }}>
																{ this.capitalize(size) }
																	<small style={{ color: '#999999', position: 'absolute', left: 0, top: 20, whiteSpace: 'nowrap' }}>
																	Price: ${ pizzasBySize[size].basePrice }
																</small>
															</span>
															}
															onChange={() => this.onChangeSize(size)}
															checked={ selectedSize === size }
															type="checkbox"
															style={{ marginBottom: 20 }}
														/>
													</Col>
												))}
											</Row>
										</Form.Group>
									</Form.Row>

									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label style={{ display: 'block' }}>Size</Form.Label>
											<Row>
												{ toppingsBySize[selectedSize].map((t, index) => {

													const isChecked = selectedToppings.indexOf(t.topping) > -1;
													const isDisabled = !isChecked && selectedToppings.length === this.state.maxToppings;
													// left for logging
													return (
														<Col lg={3} md={4} sm={6} xs={6} key={index}>
															<Form.Check
																inline
																label={
																	<span style={{ fontSize: 14, position: 'relative' }}>
															{ this.capitalize(t.topping.name) }
																		<small style={{ color: '#999999', position: 'absolute', left: 0, top: 20, whiteSpace: 'nowrap' }}>
																Add: ${ t.topping.price.toFixed(2) }
															</small>
														</span>
																}
																onChange={() => this.onChangeTopping(t.topping)}
																checked={ isChecked }
																disabled={ isDisabled }
																type="checkbox"
																style={{ marginBottom: 20 }}
															/>
														</Col>
													)
												})}
											</Row>
										</Form.Group>
									</Form.Row>

									<HR />

									<Button
										variant="primary"
										type="submit"
										onClick={(e) => this.handleSubmit(e)}
									>
										Add To Cart
									</Button>
								</Form>
							</Col>
							<Col>
								<h5>Your Cart</h5>
								<HR style={{ margin: '10px auto' }} />
								{
									cart.pizzas.length === 0
										?
										<span>Your cart is empty.</span>
										:
										(
											cart.pizzas.map((pizza, i) => {

												const rowStyle = {
													marginBottom: 15,
													paddingBottom: 15,
													borderBottom: i < cart.pizzas.length ? 'solid 1px #ccc' : 'none'
												};

												return (
													<Row key={i} style={ rowStyle }>
														<Col>
															<Row>
																<Col xs={9} style={{ fontSize: 15 }}>{ this.capitalize(pizza.size) } Pizza</Col>
																<Col xs={3} style={{ textAlign: 'right', fontSize: 13, fontWeight: 500 }}>{ pizza.price }</Col>
															</Row>
															{
																pizza.toppings.map((t, i) => (
																	<Row key={i}>
																		<Col xs={9} style={{ fontSize: 12, color: "#999" }}> + { this.capitalize(t.name) }</Col>
																		<Col xs={3} style={{ textAlign: 'right', fontSize: 11, color: "#999" }}>{ t.price.toFixed(2) }</Col>
																	</Row>
																))
															}
															<Row>
																<Col style={{ fontSize: 11, color: 'red', marginTop: 10, cursor: 'pointer' }}>
																	<span onClick={() => this.props.removeFromCart(pizza.id)}> - Remove Pizza</span>
																</Col>
															</Row>
														</Col>
													</Row>
												)
											})
										)
								}
								{
									cart.pizzas.length
										?
										<Row>
											<Col xs={9} style={{ fontSize: 15 }}>Cart Total</Col>
											<Col xs={3} style={{ textAlign: 'right', fontSize: 13, fontWeight: 500 }}>{ this.getCartTotal() }</Col>
										</Row>
										:
										null
								}
							</Col>
						</Row>
					</Container>
				</Wrapper>
			</div>
		)
	}

}

const mapStateToProps = state => {
	const { pizzasBySize, toppingsBySize, pizzaSizes, giphy, cart } = state;
	return ({
		pizzasBySize,
		toppingsBySize,
		pizzaSizes,
		giphy,
		cart
	})
};

const mapDispatchToProps = dispatch => ({
		addToCart: pizza => dispatch(addToCart(pizza)),
		removeFromCart: id => dispatch(removeFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Build);

const CartMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  z-index: 1;
  background: gold;
  line-height: 2em;
  color: red;
  font-size: 13px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const Background = styled.div`
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const Hero = styled.div`
  width: 100%;
  max-width: 1024px;
  position: relative;
  padding: 60px 0;

  @media screen and (max-width: 991px) {
    padding: 36px 0;
  }

  @media screen and (max-width: 767px) {
    padding: 18px 0;
  }
`;

const JumboHeading = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 100;
  color: #ffffff;
  font-size: 30px;

  @media screen and (max-width: 991px) {
    font-size: 24px;
  }

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const JumboSubheading = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
`;

const HR = styled.hr`
  margin: 30px auto;
  height: 0;
  border: none;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  display: block;
  clear: both;
`;
