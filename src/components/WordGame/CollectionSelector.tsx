import React, { useState } from "react";
import { Collection } from "../../types/word.types.ts";
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CollectionSelectorProps {
    collections: Collection[];
    selectedId?: number;
    onSelect: (id: number) => void;
    navigation: NativeStackNavigationProp<any, any>;
}


export const CollectionSelector = ({ onSelect, collections, selectedId, navigation }: CollectionSelectorProps) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const selectedCollection = collections.find(c => c.id === selectedId)
        || (collections.length > 0 ? collections[0] : undefined);

    const handleSelect = (collection: Collection) => {
        onSelect(collection.id);
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: Collection }) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                selectedCollection?.id === item.id && styles.selectedItem
            ]}
            onPress={() => handleSelect(item)}
        >
            <Text style={[
                styles.listItemText,
                selectedCollection?.id === item.id && styles.selectedItemText
            ]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => {
                    if (collections.length > 0) {
                        setModalVisible(true);
                    } else {
                        navigation.navigate('CollectionForm');
                    }
                }}
            >
                <Text style={styles.selectorText}>
                    {selectedCollection
                        ? selectedCollection.name
                        : 'Колекцій нема'}
                </Text>
                {collections.length > 0 && (
                    <Text style={styles.arrow}>▼</Text>
                )}
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Оберіть колекцію</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={collections}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            style={styles.list}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectorText: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        color: COLORS.darkText,
    },
    arrow: {
        fontSize: TYPOGRAPHY.fontSizes.sm,
        color: COLORS.darkText,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: {
        fontSize: TYPOGRAPHY.fontSizes.lg,
        fontWeight: TYPOGRAPHY.fontWeights.bold,
        color: COLORS.darkText,
    },
    closeButton: {
        padding: SPACING.sm,
    },
    closeButtonText: {
        fontSize: TYPOGRAPHY.fontSizes.lg,
        color: COLORS.darkText,
    },
    list: {
        paddingHorizontal: SPACING.sm,
    },
    listItem: {
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    selectedItem: {
        backgroundColor: COLORS.primaryLight,
    },
    listItemText: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        color: COLORS.darkText,
    },
    selectedItemText: {
        color: COLORS.primary,
        fontWeight: TYPOGRAPHY.fontWeights.bold,
    },
});
