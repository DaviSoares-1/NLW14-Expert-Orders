import { forwardRef } from "react";
import {
	Image,
	ImageProps,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native";

type ProductDataProps = {
	title: string;
	description: string;
	thumbnail: ImageProps;
	quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
	data: ProductDataProps;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(
	({ data, ...rest }, ref) => {
		return (
			<TouchableOpacity
				ref={ref}
				className="w-full flex-row items-center pb-4"
				{...rest}
			>
				<Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
				<View className="flex-1 ml-3">
					<View className="flex-row items-center justify-between">
						<Text className="text-slate-100 font-subtitle text-base">
							{data.title}
						</Text>
						{ data.quantity && (
								<View className="bg-lime-300 w-6 h-6 items-center justify-center rounded-md">
								<Text className="text-slate-900 font-bold text-xs">
									x {data.quantity}
								</Text>
						</View>
							)
						}
					</View>
					<Text className="text-slate-400 text-xs leading-5 mt-0.5">
						{data.description}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
);
