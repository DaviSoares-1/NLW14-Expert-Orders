import { Image, View, Text, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router"

import { PRODUCTS } from "@/utils/data/products"
import { formatCurrency } from "@/utils/functions/format-currency"
import { useCartStore } from "@/stores/cart-store"

import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"

export default function Product() {
	const cartStore = useCartStore()
	const navigation = useNavigation()
	const { id } = useLocalSearchParams()

	const product = PRODUCTS.find((item) => item.id === id)

	function handleAddToCart() {
		if (product) {
			cartStore.add(product)
			navigation.goBack()
		}
	}

	if (!product) return <Redirect href="/" />

	return (
		<View className="flex-1">
			<Image
				source={product.cover}
				className="w-full h-52"
				resizeMode="contain"
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="p-5 mt-4 flex-1">
					<Text className="text-white font-bold text-xl">{product.title}</Text>
					<Text className="text-lime-400 text-2xl font-heading my-2">
						{formatCurrency(product.price)}
					</Text>
					<Text className="text-slate-400 font-body text-base leading-6 mb-6 border-b border-slate-700 pb-4 border-dotted">
						{product.description}
					</Text>
					{product.ingredients.map((ingredient) => (
						<Text
							key={ingredient}
							className="text-slate-300 font-body 
            	text-base leading-6"
						>
							{"\u2022"} {ingredient}
						</Text>
					))}
				</View>
			</ScrollView>
			<View className="p-5 pb-8 gap-2">
				<Button onPress={handleAddToCart}>
					<Button.Icon>
						<Feather name="plus-circle" size={20} />
					</Button.Icon>
					<Button.Text>Adicionar ao pedido</Button.Text>
				</Button>
				<LinkButton href="/" title="Voltar ao cardápio" />
			</View>
		</View>
	)
}
