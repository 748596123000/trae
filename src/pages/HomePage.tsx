import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  TripPlanner: undefined;
  TripDetail: { tripId: string };
  AIAssistant: undefined;
};

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

// Mock data for recommendations
const mockRecommendations = [
  {
    id: '1',
    destination: '成都',
    duration: 3,
    budget: 1500,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20city%20skyline%20with%20panda%20and%20traditional%20architecture&image_size=landscape_16_9',
    valueScore: 4.8,
    tags: ['美食', '文化', '熊猫'],
  },
  {
    id: '2',
    destination: '大理',
    duration: 4,
    budget: 2000,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dali%20ancient%20town%20with%20Erhai%20Lake%20and%20Cangshan%20Mountains&image_size=landscape_16_9',
    valueScore: 4.9,
    tags: ['自然', '古镇', '湖景'],
  },
  {
    id: '3',
    destination: '厦门',
    duration: 2,
    budget: 1200,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiamen%20coastal%20city%20with%20Gulangyu%20Island%20and%20modern%20skyline&image_size=landscape_16_9',
    valueScore: 4.7,
    tags: ['海岛', '小清新', '美食'],
  },
];

// Mock data for deals
const mockDeals = [
  {
    id: '1',
    title: '成都熊猫基地门票优惠',
    discount: '8折',
    price: '¥40',
    expiry: '3天后结束',
  },
  {
    id: '2',
    title: '大理古城民宿特惠',
    discount: '7折',
    price: '¥120/晚',
    expiry: '5天后结束',
  },
  {
    id: '3',
    title: '厦门轮渡船票折扣',
    discount: '9折',
    price: '¥36',
    expiry: '2天后结束',
  },
];

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickPlan = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('TripPlanner');
    }, 1000);
  };

  const renderRecommendation = ({ item }: { item: typeof mockRecommendations[0] }) => (
    <TouchableOpacity
      style={styles.recommendationCard}
      onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.recommendationImage} />
      <View style={styles.recommendationContent}>
        <Text style={styles.recommendationTitle}>{item.destination}</Text>
        <View style={styles.recommendationMeta}>
          <Text style={styles.recommendationMetaText}>{item.duration}天</Text>
          <Text style={styles.recommendationMetaText}>¥{item.budget}</Text>
          <View style={styles.valueScore}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.valueScoreText}>{item.valueScore}</Text>
          </View>
        </View>
        <View style={styles.tags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDeal = ({ item }: { item: typeof mockDeals[0] }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle}>{item.title}</Text>
        <Text style={styles.dealExpiry}>{item.expiry}</Text>
      </View>
      <View style={styles.dealPrice}>
        <Text style={styles.dealDiscount}>{item.discount}</Text>
        <Text style={styles.dealPriceValue}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>智省旅行</Text>
        <Text style={styles.heroSubtitle}>少花钱，玩得更好</Text>
      </View>

      {/* Quick Trip Planner */}
      <View style={styles.quickPlanner}>
        <Text style={styles.sectionTitle}>快速规划</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="目的地"
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="预算 (¥)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="天数"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.planButton}
            onPress={handleQuickPlan}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.planButtonText}>生成行程</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendations}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>推荐行程</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>查看更多</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={mockRecommendations}
          renderItem={renderRecommendation}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendationsList}
        />
      </View>

      {/* Real-time Deals */}
      <View style={styles.deals}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>实时优惠</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>查看全部</Text>
          </TouchableOpacity>
        </View>
        {mockDeals.map((deal) => (
          <View key={deal.id}>{renderDeal({ item: deal })}</View>
        ))}
      </View>

      {/* AI Assistant Button */}
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('AIAssistant')}
      >
        <Ionicons name="chatbubbles" size={24} color="white" />
        <Text style={styles.aiButtonText}>AI旅行助手</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    backgroundColor: '#3B82F6',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickPlanner: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  planButton: {
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  planButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendations: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeMore: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  recommendationsList: {
    paddingRight: 20,
  },
  recommendationCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendationImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  recommendationContent: {
    padding: 16,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  recommendationMetaText: {
    fontSize: 14,
    color: '#666',
  },
  valueScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#3B82F6',
  },
  deals: {
    padding: 20,
  },
  dealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dealContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dealExpiry: {
    fontSize: 12,
    color: '#666',
  },
  dealPrice: {
    alignItems: 'flex-end',
  },
  dealDiscount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  dealPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  aiButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomePage;