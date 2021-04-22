import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import {Button, Card, Divider, Icon, Layout, Spinner, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ThemeContext} from '../../theme-context';
import {ScrollView, Image, RefreshControl, StatusBar, View} from "react-native";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileItem from "../componenets/ProfileItem";
import ProfileSocial from "../componenets/ProfileSocial";
import SimpleLink from "../componenets/SimpleLink";
import SettingScreen from "../screens/Setting";

export class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };
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
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            style={{width: 80, height: 80, borderRadius: 80/2, marginRight: 10}} resizeMode='cover'
                            source={{uri: this.state.user.avatar}}
                        />
                        <View>
                            <Text category='h5' style={{fontFamily: 'Roboto-Bold'}}>{profile.first_name} {profile.last_name}</Text>
                            <Text appearance={'hint'} style={{fontFamily: 'Roboto-Medium'}}>{profile.nationality}</Text>
                            <SimpleLink url={profile.websites[0]?.url} style={{lineHeight: 16, marginBottom: 15, fontSize: 14}} status={'warning'}/>
                        </View>
                    </View>

                    <Divider style={{marginVertical: 15}}/>
                    {
                        profile.socials.length && (
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                {profile.socials.map((social) => <ProfileSocial key={social.social} type={social.social} url={social.url} />)}
                            </View>
                        )
                    }
                    <Divider style={{marginVertical: 15}}/>

                    <Text style={{marginBottom: 10, textAlign: 'center'}} appearance={'hint'}>{profile.professional_profile}</Text>

                    <Divider style={{marginVertical: 15}}/>
                    <Button onPress={() => this.props.navigation.navigate('Education')}>SHOW MORE</Button>
                    {/*<Button style={{marginVertical: 4}} onPress={this.props.themeContext.toggleTheme} type={'warning'}>TOGGLE THEME</Button>*/}

                </View>
                <Layout style={{padding: 20}} level={'3'}>
                    <ProfileItem title={'EMAIL'} value={user.email}/>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <ProfileItem title={'EMAIL'} value={profile.gender.toUpperCase()} style={{marginRight: 10, flexBasis: 1}}/>
                        <ProfileItem title={'DATE OF BIRTH'} value={profile.date_of_birth} style={{marginLeft: 10, flexBasis: 1}}/>
                    </View>
                    <ProfileItem title={'ADDRESS'} value={profile.address}/>
                    <ProfileItem title={'CONTACT'} value={'+'+profile.phones[0]?.prefix + profile.phones[0]?.number}/>

                    <Card style={{marginBottom: 25, borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                        <Text appearance={'hint'} style={{letterSpacing: 5, textAlign: 'center', marginVertical: 10, fontFamily: 'Roboto-Bold', fontSize: 14}}>I'M CAPABLE TO</Text>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -2.5, marginBottom: 20}}>
                            {user.expertise.filter(skill => skill.is_primary === 1).map((skill) => {
                                return (
                                    <View key={skill.id} style={{padding: 5, width: '33%', height: 80}}>
                                        <Image
                                            style={{flex: 1}} resizeMode='contain'
                                            source={{uri: skill.icon}}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                        <Button appearance='ghost' status='primary'
                                icon={(style) => <Icon name='arrow-forward-outline' {...style} />}
                                onPress={() => this.props.navigation.navigate('Skill')}>
                            ALL SHOWCASES
                        </Button>
                    </Card>

                    <Text appearance={'hint'} style={{letterSpacing: 5, textAlign: 'center', marginVertical: 10, fontFamily: 'Roboto-Medium', fontSize: 14}}>MY LATEST WORK</Text>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -2.5}}>
                        {user.portfolios.slice(0, 6).map((portfolio) => {
                            return (
                                <View key={portfolio.id} style={{padding: 5, width: '33.33%', height: 100}}>
                                    <Image
                                           style={{flex: 1, borderRadius: 5}} resizeMode='cover'
                                           source={{uri: portfolio.medias[0].src}}
                                    />
                                </View>
                            )
                        })}
                    </View>
                    <Button appearance='ghost' status='primary'
                            icon={(style) => <Icon name='arrow-forward-outline' {...style} />}
                            onPress={() => this.props.navigation.navigate('Portfolio')} style={{marginVertical: 15}}>
                        ALL SHOWCASES
                    </Button>
                </Layout>
            </View>
        )
    }
    showOption() {
        this.props.navigation.navigate('Setting')
    };
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title={'Home'} titleStyle={{fontFamily: 'Roboto-Medium'}}
                               alignment='center' style={{elevation: 30, marginTop: StatusBar.currentHeight}}
                               rightControls={<TopNavigationAction icon={(style) => <Icon {...style} name='options-2-outline'/>} onPress={() => this.showOption()}/>}/>
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

function Profile({navigation}) {
    const themeContext = React.useContext(ThemeContext);

    return <HomeScreen navigation={navigation} themeContext={themeContext}/>
}

class Account extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return <Profile navigation={this.props.navigation}/>;
    }
}

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Setting: {screen: SettingScreen},
});
export default createAppContainer(MainNavigator);
