import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type buttonProps = TouchableOpacityProps & {
  children: ReactNode
}

type buttonTextProps = { 
  children: ReactNode
}

type buttonIconProps = {
  children: ReactNode
}

function Button({children, ...rest}: buttonProps) {
  return (
    <TouchableOpacity className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row mb-1" activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacity>
  )
}

function ButtonText({ children }: buttonTextProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">
      {children}
    </Text>
  )
}

function ButtonIcon({ children }: buttonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }