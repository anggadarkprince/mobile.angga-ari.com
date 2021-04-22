import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
    Card,
    CardHeader,
    Divider,
    Icon,
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    Spinner, Button
} from '@ui-kitten/components';
import {StatusBar, FlatList, View, RefreshControl, StyleSheet, ScrollView} from "react-native";
import {ThemeContext} from "../../theme-context";

class SettingScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    backAction = () => (
        <TopNavigationAction icon={(style) => <Icon {...style} name='arrow-back' />} onPress={() => this.props.navigation.goBack()}/>
    );

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title={'Setting'} titleStyle={{fontFamily: 'Roboto-Medium'}}
                               alignment='center' style={{elevation: 30, marginTop: StatusBar.currentHeight}} leftControl={this.backAction()}/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    <Button style={{marginVertical: 4}} onPress={this.props.themeContext.toggleTheme} type={'warning'}>TOGGLE THEME</Button>
                </Layout>
            </SafeAreaView>
        );
    }
}

function Option({navigation}) {
    const themeContext = React.useContext(ThemeContext);
    return <SettingScreen navigation={navigation} themeContext={themeContext}/>
}

export default class OptionScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return <Option navigation={this.props.navigation}/>;
    }
}
