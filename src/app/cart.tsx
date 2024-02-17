import { useState } from "react"
import { View, Text, ScrollView, Alert, Linking } from "react-native"
import { useNavigation } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { ProductCardProps, useCartStore } from "@/stores/cart-store"

import { formatCurrency } from "@/utils/functions/format-currency"

import { Header } from "@/components/header"
import { Button } from "@/components/button"
import { Product } from "@/components/product"
import { Input } from "@/components/input"
import { LinkButton } from "@/components/link-button"

// OBS; Quando subir para o Github, Coloque um número fake!!
const PHONE_NUMBER = "9999999999999"

export default function Cart() {
	const [address, setAddress] = useState("")
	const cartStore = useCartStore()
	const navigation = useNavigation()

	const total = formatCurrency(
		cartStore.products.reduce((total, product) => {
			return total + product.price * product.quantity
		}, 0)
	)

	function handleProductRemove(product: ProductCardProps) {
		Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
			{
				text: "Cancelar",
			},
			{
				text: "Remover",
				onPress: () => cartStore.remove(product.id),
			},
		])
	}

	function handleOrder() {
		if (address.trim().length === 0) {
			return Alert.alert("Pedido", "Informe os dados da entrega.")
		}
		const products = cartStore.products
			.map((product) => `\n ${product.quantity} ${product.title}`)
			.join("")
		const message = `🍔 NOVO PEDIDO 🍔
			\n 🚴 Entregar em: ${address}
			${products}
			\n 💰 Valor total: ${total}
		`
		Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
		cartStore.clear()
		navigation.goBack()
	}

	return (
		<View className="flex-1 pt-8">
			<Header title="Seu carrinho" />
			<KeyboardAwareScrollView>
				<ScrollView>
					<View className="p-5 flex-1">
						{cartStore.products.length > 0 ? (
							<View className="border-b border-slate-700 pb-2">
								{cartStore.products.map((product) => (
									<Product
										key={product.id}
										data={product}
										onPress={() => handleProductRemove(product)}
									/>
								))}
							</View>
						) : (
							<Text className="font-body text-slate-400 text-center my-8">
								Seu carrinho está vazio 🛒
							</Text>
						)}
						<View className="flex-row gap-2 items-center mt-5 mb-4">
							<Text className="font-subtitle text-white text-xl">Total:</Text>
							<Text className="text-lime-400 font-heading text-2xl">
								{total}
							</Text>
						</View>
						<Input
							placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
							onChangeText={setAddress}
							blurOnSubmit={true}
							onSubmitEditing={handleOrder}
							returnKeyType="done"
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
			<View className="p-5 gap-5">
				<Button onPress={handleOrder}>
					<Button.Text>Enviar pedido</Button.Text>
					<Button.Icon>
						<Feather name="arrow-right-circle" size={20} />
					</Button.Icon>
				</Button>
				<LinkButton href="/" title="Voltar ao cardápio" />
			</View>
		</View>
	)
}
