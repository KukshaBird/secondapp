import React from "react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import { styles } from "../../screens/styles.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../screens/AdminPanelScreen.tsx";

type AdminPanelScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'Panel'>;

export interface AdminPanelProps {
    navigation: AdminPanelScreenNavigationProp;
}

export const AdminPanel = ({ navigation }: AdminPanelProps): React.JSX.Element => {


    return (
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Панель управління</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Words")}
                    >
                        <Text style={styles.buttonText}>Картки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Collections')}
                    >
                        <Text style={styles.buttonText}>Коллекції</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};