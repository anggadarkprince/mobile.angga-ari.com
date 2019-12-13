import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import {Button, Card, Divider, Icon, Layout, Spinner, Text, TopNavigation} from '@ui-kitten/components';
import {ThemeContext} from '../../theme-context';
import {ScrollView, Image, RefreshControl, StatusBar, View} from "react-native";

export class HomeScreen extends Component {
    state = {
        isLoading: true,
        user: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        fetch('http://192.168.1.123:8080/api/anggadarkprince')
            .then(result => result.json())
            .then(user => {
                this.setState({isLoading: false, user});
            })
            .catch(err => {
                this.setState({isLoading: false});
                alert(err.message);
            });
    }

    buildProfile() {
        const user = this.state.user;
        const profile = user.profile;
        return (
            <View style={{flex: 1}}>
                <View style={{padding: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                        <Image
                            style={{width: 75, height: 75, borderRadius: 75/2, marginRight: 10}} resizeMode='cover'
                            source={{uri: this.state.user.avatar}}
                        />
                        <View>
                            <Text category='h5' style={{fontFamily: 'Roboto-Bold'}}>{profile.first_name} {profile.last_name}</Text>
                            <Text style={{color: '#8f9bb3'}}>{profile.nationality}</Text>
                        </View>
                    </View>
                    <Text style={{marginBottom: 10, color: '#8f9bb3', textAlign: 'center'}}>{profile.professional_profile}</Text>
                    <Button onPress={() => this.props.navigation.navigate('Education')}>SHOW MORE</Button>
                    <Button style={{marginVertical: 4}} onPress={this.props.themeContext.toggleTheme}>TOGGLE THEME</Button>
                </View>
                <View style={{padding: 20, backgroundColor: '#f6f6f6'}}>
                    <Card style={{marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                        <Text style={{fontSize: 12, color: '#8f9bb3'}}>EMAIL</Text>
                        <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
                            {user.email}
                        </Text>
                    </Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Card style={{flex: 1, flexBasis: 1, marginBottom: 15, marginRight: 10, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                            <Text style={{fontSize: 12, color: '#8f9bb3'}}>GENDER</Text>
                            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
                                {profile.gender.toUpperCase()}
                            </Text>
                        </Card>
                        <Card style={{flex: 1, flexBasis: 1, marginBottom: 15, marginLeft: 10, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                            <Text style={{fontSize: 12, color: '#8f9bb3'}}>DATE OF BIRTH</Text>
                            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
                                {profile.date_of_birth}
                            </Text>
                        </Card>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.user ?
                            <ScrollView refreshControl={
                                <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.fetchData()} />
                            }>
                                {this.buildProfile()}
                            </ScrollView>
                            : <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}><Spinner/></View>
                    }
                </Layout>
            </SafeAreaView>
        );
    }
}

export default function Profile({navigation}) {
    const themeContext = React.useContext(ThemeContext);

    return <HomeScreen navigation={navigation} themeContext={themeContext}/>
};
