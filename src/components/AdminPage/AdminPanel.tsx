import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../screens/styles.ts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AdminStackParamList } from "../../screens/AdminPanelScreen.tsx";

export const AdminPanel = (): React.JSX.Element => {
    const navigation = useNavigation<NavigationProp<AdminStackParamList>>();
    return (
        <>
            <SafeAreaView style={styles.container}>
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
