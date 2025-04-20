import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Word } from '../../types/word.types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

interface WordListProps {
    words: Word[];
    onWordPress?: (word: Word) => void;
}

const ITEMS_PER_PAGE = 15; // 3x5 grid
const NUM_COLUMNS = 3;

const WordList: React.FC<WordListProps> = ({ words, onWordPress }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate total pages
    const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE);

    // Get current page items
    const getCurrentPageItems = () => {
        const start = currentPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return words.slice(start, end);
    };

    const renderWordItem = ({ item }: { item: Word }) =>  (

            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onWordPress?.(item)}
            >
                <Text style={styles.wordText}>{item.word}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: item.img.startsWith('http') ? item.img : `file://${item.img}`}}
                        style={styles.image}
                        onError={(error: any) => console.log(error.nativeEvent.error)}
                    />
                </View>
            </TouchableOpacity>
        )


    const renderPagination = () => (
        <View style={styles.paginationContainer}>
            <TouchableOpacity
                style={[styles.pageButton, currentPage === 0 && styles.pageButtonDisabled]}
                onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
            >
                <Text style={styles.pageButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.pageText}>
                {`${currentPage + 1} / ${totalPages}`}
            </Text>

            <TouchableOpacity
                style={[styles.pageButton, currentPage >= totalPages - 1 && styles.pageButtonDisabled]}
                onPress={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
            >
                <Text style={styles.pageButtonText}>→</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={getCurrentPageItems()}
                renderItem={renderWordItem}
                keyExtractor={item => item.id.toString()}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No words available</Text>
                }
                ListFooterComponent={renderPagination}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - (SPACING.md * 4)) / NUM_COLUMNS;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    itemContainer: {
        width: itemWidth,
        margin: SPACING.xs,
        alignItems: 'center',
    },
    wordText: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        color: COLORS.darkText,
        marginBottom: SPACING.xs,
    },
    imageContainer: {
        width: itemWidth,
        height: itemWidth,
        backgroundColor: COLORS.secondaryLight,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        gap: SPACING.md,
    },
    pageButton: {
        padding: SPACING.sm,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        minWidth: 44,
        alignItems: 'center',
    },
    pageButtonDisabled: {
        backgroundColor: COLORS.secondaryLight,
    },
    pageButtonText: {
        color: 'white',
        fontSize: TYPOGRAPHY.fontSizes.lg,
    },
    pageText: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        color: COLORS.darkText,
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.darkText,
        fontSize: TYPOGRAPHY.fontSizes.md,
        padding: SPACING.lg,
    },
});

export default WordList;