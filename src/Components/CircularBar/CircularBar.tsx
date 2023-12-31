import React from 'react';
import { View, StyleSheet } from 'react-native';

const CircularProgressBar = ({ progress }:any) => {
    const propStyle = (percent:any, base_degrees:any) => {
        const rotateBy = base_degrees + percent * 3.6;
        return {
            transform: [{ rotateZ: `${rotateBy}deg` }],
        };
    };
    const renderThirdLayer = (percent:any) => {
        if (percent > 50) {
            return <View style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}></View>;
        } else {
            return <View style={styles.offsetLayer}></View>;
        }
    };
    let firstProgressLayerStyle;
    if (progress > 50) {
        firstProgressLayerStyle = propStyle(50, -135);
    } else {
        firstProgressLayerStyle = propStyle(progress, -135);
    }
    return (
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(progress)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstProgressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
        transform: [{ rotateZ: '-135deg' }],
    },
    secondProgressLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
        transform: [{ rotateZ: '45deg' }],
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'blue',
        borderTopColor: 'blue',
        transform: [{ rotateZ: '-135deg' }],
    },
});

export default CircularProgressBar;
