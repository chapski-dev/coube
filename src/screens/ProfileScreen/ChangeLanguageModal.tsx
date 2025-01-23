import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from '@src/ui/Text';

export const ChangeLanguageModal = () => {
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
			<BottomSheet
				ref={bottomSheetRef}
				onChange={handleSheetChanges}
				snapPoints={snapPoints}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheet>
	);
	};

	const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: 'center',
	},
});