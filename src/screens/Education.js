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
import {StatusBar, FlatList, View, RefreshControl, StyleSheet} from "react-native";

export default class EducationScreen extends Component {
    state = {
        isLoading: true,
        educations: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince/educations')
            .then(result => result.json())
            .then(educations => {
                this.setState({isLoading: false, educations});
            })
            .catch(err => {
                this.setState({isLoading: false});
                alert(err.message);
            });
    }

    backAction = () => (
        <TopNavigationAction icon={(style) => <Icon {...style} name='arrow-back'/>}
                             onPress={() => this.props.navigation.goBack()}/>
    );

    buildList({item, index}) {
        const header = () => (
            <View style={{marginHorizontal: 25, marginVertical: 14}}>
                <Text style={{fontFamily: 'Roboto-Bold'}} category='h6'>
                    {item.education}
                </Text>
                <Text style={{color: '#8f9bb3', letterSpacing: 0.5, fontSize: 14}}>
                    {item.institution}
                </Text>
            </View>
        );
        return (
            <View>
                <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                    {item.field && <Text style={{fontFamily: 'Roboto-Medium'}} status='warning'>{item.field}</Text>}
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5}}>
                        <Text style={{fontSize: 12}}>{item.location}</Text>
                        <Text style={{fontSize: 12}}>
                            {(new Date(item.start_date)).getFullYear()} - {item.until_date ? (new Date(item.until_date)).getFullYear() : 'Now'}
                        </Text>
                    </View>
                </Card>
                {index === this.state.educations.length - 1 && <Button onPress={() => this.props.navigation.navigate('Skill')} style={{marginVertical: 15}}>SHOW MORE</Button>}
            </View>
        )
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} titleStyle={{fontFamily: 'Roboto-Medium'}} alignment='center' style={{elevation: 30}}
                               leftControl={this.backAction()}/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.educations ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.educations}
                                      renderItem={this.buildList.bind(this)}
                                      keyExtractor={item => item.id.toString()}
                                      refreshControl={
                                          <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.fetchData()} />
                                      }
                            />
                            : <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}><Spinner/></View>
                    }
                </Layout>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
})
