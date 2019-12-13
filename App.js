import React from 'react';
import * as Font from 'expo-font';
import {
    ApplicationProvider,
    BottomNavigation,
    BottomNavigationTab,
    Button, Divider,
    Icon,
    IconRegistry,
    Layout,
    Text,
    TopNavigation
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light, dark} from '@eva-design/eva';
import {default as appTheme} from './custom-theme.json';
import {default as customMapping} from './custom-mapping.json';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProfileScreen from './src/screens/Profile';
import EducationScreen from './src/screens/Education';
import ExperienceScreen from './src/screens/Experience';
import SkillScreen from './src/screens/Skill';
import {StatusBar, View} from "react-native";
import {ThemeContext} from './theme-context';
import PortfolioScreen from "./src/screens/Portfolio";

const routeMap = {
    Home: {screen: ProfileScreen, params: {title: 'HOME'}},
    Education: {screen: EducationScreen, params: {title: 'EDUCATIONS'}},
    Skill: {screen: SkillScreen, params: {title: 'SKILLS'}},
    Experience: {screen: ExperienceScreen, params: {title: 'EXPERIENCES'}},
    Portfolio: {screen: PortfolioScreen, params: {title: 'PORTFOLIOS'}},
};

const tabOptions = {
    initialRouteName: 'Home',
    tabBarComponent: ({navigation}) => {
        const onSelect = (index) => {
            const selectedTabRoute = navigation.state.routes[index];
            navigation.navigate(selectedTabRoute.routeName);
        };

        return (
            <SafeAreaView>
                <Divider/>
                <BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect}>
                    <BottomNavigationTab icon={(style) => <Icon {...style} name='home-outline'/>}/>
                    <BottomNavigationTab icon={(style) => <Icon {...style} name='book-outline'/>}/>
                    <BottomNavigationTab icon={(style) => <Icon {...style} name='pantone-outline'/>}/>
                    <BottomNavigationTab icon={(style) => <Icon {...style} name='briefcase-outline'/>}/>
                    <BottomNavigationTab icon={(style) => <Icon {...style} name='browser-outline'/>}/>
                </BottomNavigation>
            </SafeAreaView>
        );
    }
};

const HomeNavigator = createBottomTabNavigator(routeMap, tabOptions);
const AppNavigator = createAppContainer(HomeNavigator);

const themes = {light: {...light, ...appTheme}, dark};

class App extends React.Component {
    state = {
        fontLoaded: false,
        themeName: 'light'
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    toggleTheme = () => {
        const nextTheme = this.state.themeName === 'light' ? 'dark' : 'light';
        this.setState({themeName: nextTheme});
    };

    render() {
        const toggleTheme = this.toggleTheme;
        const themeName = this.state.themeName;
        const currentTheme = themes[themeName];
        return this.state.fontLoaded ? (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack}/>
                <ThemeContext.Provider value={{themeName, toggleTheme}}>
                    <ApplicationProvider mapping={mapping} theme={currentTheme} customMapping={customMapping}>
                        <AppNavigator/>
                    </ApplicationProvider>
                </ThemeContext.Provider>
            </React.Fragment>
        ) : null
    };
}

export default App;
