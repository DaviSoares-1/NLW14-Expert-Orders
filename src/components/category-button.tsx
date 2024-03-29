import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

type categoryProps = PressableProps & {
	title: String;
	isSelected?: Boolean;
};

export function CategoryButton({ title, isSelected, ...rest }: categoryProps) {
	return (
		<Pressable
			className={clsx(
				"bg-slate-800 px-4 justify-center rounded-md h-10 border-2 border-transparent",
				isSelected && "border-lime-300"
			)}
			{...rest}
		>
			<Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
		</Pressable>
	);
}
