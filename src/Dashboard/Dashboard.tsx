import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Assuming you are using React Navigation
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import WebViewComponent from '../Components/WebView/WebView';
const Dashboard = ({ navigation }: any) => {
    const [actualData, setActualData] = useState<any>(null);
    const [animationProgress, setAnimationProgress] = useState<number>(0);
    const [animationIndex, setAnimationIndex] = useState<number>(-1);
    const animationRef = useRef<LottieView>(null);
    const [modal, setModal] = useState(false);
    const [play, setAutoPlay] = useState<any>(true);
    const [webViewVisible, setWebViewVisible] = useState(false);
    console.log(webViewVisible)
    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('auth');
            console.log(storedData);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log(parsedData);
                setActualData(parsedData);
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    const ProgressBar = ({ progress }: { progress: any }) => (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 15, // Adjust the borderRadius as needed
                backgroundColor: 'blue',
                opacity: 0.5, // Adjust the opacity as needed
                width: `${progress}%`,
            }}
        />
    )
    useEffect(() => {
        fetchData();
    }, []);
    const carouselItems = [
        {
            title: 'Animation 1',
            animation: require('../assets/oneLine.json'),
        },
        {
            title: 'Animation 2',
            animation: require('../assets/noAttack.json'),
        },
        {
            title: 'Animation 3',
            animation: require('../assets/cts.json'),
        },
    ];
    const handleAnimationPress = (index: any) => {
        console.log(index, animationIndex);
        if (index === 'Animation 2') {
            setAutoPlay(false);
            const newProgress = (animationProgress + 33) % 100;
            setAnimationProgress(newProgress);
        } else if (index === 'Animation 3') {
            setModal(true);
            setAutoPlay(true);
        } else if (index === 'Animation 1') {
            setWebViewVisible(true);
            setAutoPlay(true);
        } else {
            setAutoPlay(true);
        }
        if (animationRef.current) {
            if (index !== 'Animation 2') {
                animationRef.current.play(animationProgress / 100, (animationProgress + 33) / 100);
            } else {
                animationRef.current.play(animationProgress / 100, animationProgress / 100 + 0.33);
            }
        }
        setAnimationIndex(index);
    };
    console.log(animationProgress)
    const renderItem = ({ item, index }: any) => (
        <TouchableOpacity onPress={() => handleAnimationPress(item.title)}>
            <View>
                {item.title === 'Animation 2' ? (
                    <View>
                        <ProgressBar progress={animationProgress} />
                        <LottieView
                            ref={animationRef}
                            source={item.animation}
                            autoPlay={play}
                            loop={play}
                            progress={animationProgress / 100}
                            style={{ width: 300, height: 300 }}
                        />
                    </View>
                ) : (
                    <LottieView
                        ref={animationRef}
                        source={item.animation}
                        autoPlay={true}
                        loop={true}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <Text style={{ color: 'white', alignSelf: 'center' }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
    const handleLogout = () => {
        navigation.navigate('Home');
        ToastAndroid.show('Logout Successful', ToastAndroid.SHORT)
    }
    console.log('Rendering WebView:', webViewVisible, actualData);
    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                    <View>
                        {actualData && <Text style={{ color: 'white' }}>{actualData.email}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => handleLogout()}>
                        <Text style={{ color: 'white' }}>logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '30%' }}>
                    <Carousel
                        data={carouselItems}
                        renderItem={renderItem}
                        sliderWidth={300}
                        itemWidth={300}
                    />
                </View>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: '60%', borderWidth: 1, borderColor: 'white', padding: 30 }}>
                <Text style={{ color: '#FFFFFF' }} >Bottom Sheet</Text>
            </TouchableOpacity>
            <View>
                <Modal
                    visible={modal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {
                        setModal(false);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModal(false)}>
                            <Feather
                                name={"chevron-down"}
                                color={'white'}
                                size={40}
                                style={{ color: 'white' }}
                            />
                            {/* <Text style={{ color: 'white', fontSize: 20 }}>Close</Text> */}
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={{ color: 'white', fontSize: 20 }}>This is a bottom sheet,</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>launched by tapping the</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>lottie or swiping up</Text>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', height: '90%', zIndex: 1 }}>
                {webViewVisible && actualData && (
                    <WebViewComponent webViewVisible={webViewVisible} actualData={actualData} />
                )}
            </View>
        </SafeAreaView >
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    progressBarContainer: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: 'blue',
    },
    progressBar: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 150,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'white',
        borderWidth: 5,
    },
    modalContainer: {
        backgroundColor: '#000',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: '45%',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
