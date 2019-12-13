import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {ThemeContext} from '../../theme-context';
import {StatusBar} from "react-native";

export class HomeScreen extends Component {

    componentDidMount() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince')
            .then(result => result.json())
            .then(profile => {
                //console.log(profile);
            })
            .catch(err => {
                alert(err.message);
            });
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} alignment='center'/>
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={() => this.props.navigation.navigate('Education')}>OPEN DETAILS</Button>
                    <Button style={{marginVertical: 4}} onPress={this.props.themeContext.toggleTheme}>TOGGLE THEME</Button>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default function Profile({navigation}) {
    const themeContext = React.useContext(ThemeContext);

    return <HomeScreen navigation={navigation} themeContext={themeContext}/>
};
