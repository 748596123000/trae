import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  POIDetail: { poiId: string };
};

type DiscoverPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

// Mock data for hidden gems
const mockHiddenGems = [
  {
    id: '1',
    name: '成都熊猫基地',
    description: '近距离观赏国宝大熊猫，了解它们的生活习性',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Giant%20panda%20eating%20bamboo%20in%20Chengdu%20Research%20Base&image_size=landscape_16_9',
    rating: 4.8,
    valueScore: 4.9,
    price: '¥58',
    distance: '5km',
  },
  {
    id: '2',
    name: '大理洱海',
    description: '高原湖泊，风景秀丽，适合骑行和拍照',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Erhai%20Lake%20in%20Dali%20with%20traditional%20boats%20and%20mountains&image_size=landscape_16_9',
    rating: 4.9,
    valueScore: 5.0,
    price: '免费',
    distance: '3km',
  },
  {
    id: '3',
    name: '厦门鼓浪屿',
    description: '充满异国风情的小岛，有许多历史建筑和特色店铺',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Gulangyu%20Island%20in%20Xiamen%20with%20colonial%20buildings%20and%20coastline&image_size=landscape_16_9',
    rating: 4.7,
    valueScore: 4.8,
    price: '¥35',
    distance: '2km',
  },
];

// Mock data for local experiences
const mockLocalExperiences = [
  {
    id: '1',
    name: '成都川菜烹饪课',
    description: '学习制作正宗川菜，包括麻婆豆腐和宫保鸡丁',
    price: '¥150/人',
    duration: '3小时',
    rating: 4.9,
  },
  {
    id: '2',
    name: '大理白族扎染体验',
    description: '学习传统白族扎染技艺，制作自己的手工艺品',
    price: '¥80/人',
    duration: '2小时',
    rating: 4.8,
  },
  {
    id: '3',
    name: '厦门海鲜市场之旅',
    description: '跟随当地向导逛海鲜市场，学习挑选海鲜',
    price: '¥100/人',
    duration: '2.5小时',
    rating: 4.7,
  },
];

// Mock data for food recommendations
const mockFoodRecommendations = [
  {
    id: '1',
    name: '成都火锅',
    description: '正宗四川火锅，麻辣鲜香',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20hotpot%20with%20spicy%20broth%20and%20various%20ingredients&image_size=landscape_16_9',
    price: '¥80/人',
    rating: 4.9,
    distance: '1km',
  },
  {
    id: '2',
    name: '大理乳扇',
    description: '当地特色奶制品，可烤可炸',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dali%20milk%20fan%20(ru%20shan)%20being%20grilled%20with%20sugar&image_size=landscape_16_9',
    price: '¥10/份',
    rating: 4.7,
    distance: '500m',
  },
  {
    id: '3',
    name: '厦门沙茶面',
    description: '闽南特色面食，汤头浓郁',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiamen%20satay%20noodles%20(shacha%20mian)%20with%20seafood&image_size=landscape_16_9',
    price: '¥25/碗',
    rating: 4.8,
    distance: '800m',
  },
];

const DiscoverPage: React.FC = () => {
  const navigation = useNavigation<DiscoverPageNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('gems'); // gems, experiences, food

  const renderHiddenGem = ({ item }: { item: typeof mockHiddenGems[0] }) => (
    <TouchableOpacity
      style={styles.gemCard}
      onPress={() => navigation.navigate('POIDetail', { poiId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.gemImage} />
      <View style={styles.gemContent}>
        <Text style={styles.gemName}>{item.name}</Text>
        <Text style={styles.gemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.gemMeta}>
          <View style={styles.gemRating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.gemRatingText}>{item.rating}</Text>
          </View>
          <View style={styles.gemValue}>
            <Ionicons name="diamond" size={14} color="#3B82F6" />
            <Text style={styles.gemValueText}>{item.valueScore}</Text>
          </View>
          <Text style={styles.gemPrice}>{item.price}</Text>
          <Text style={styles.gemDistance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLocalExperience = ({ item }: { item: typeof mockLocalExperiences[0] }) => (
    <TouchableOpacity style={styles.experienceCard}>
      <View style={styles.experienceContent}>
        <Text style={styles.experienceName}>{item.name}</Text>
        <Text style={styles.experienceDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.experienceMeta}>
          <Text style={styles.experiencePrice}>{item.price}</Text>
          <Text style={styles.experienceDuration}>{item.duration}</Text>
          <View style={styles.experienceRating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.experienceRatingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.experienceIcon}>
        <Ionicons name="walk" size={24} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );

  const renderFood = ({ item }: { item: typeof mockFoodRecommendations[0] }) => (
    <TouchableOpacity style={styles.foodCard}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodContent}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.foodMeta}>
          <Text style={styles.foodPrice}>{item.price}</Text>
          <View style={styles.foodRating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.foodRatingText}>{item.rating}</Text>
          </View>
          <Text style={styles.foodDistance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索景点、体验或美食"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'gems' && styles.activeTab]}
          onPress={() => setActiveTab('gems')}
        >
          <Text style={[styles.tabText, activeTab === 'gems' && styles.activeTabText]}>
            隐藏宝石
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'experiences' && styles.activeTab]}
          onPress={() => setActiveTab('experiences')}
        >
          <Text style={[styles.tabText, activeTab === 'experiences' && styles.activeTabText]}>
            当地体验
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'food' && styles.activeTab]}
          onPress={() => setActiveTab('food')}
        >
          <Text style={[styles.tabText, activeTab === 'food' && styles.activeTabText]}>
            美食推荐
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'gems' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>隐藏宝石</Text>
            <Text style={styles.sectionSubtitle}>探索当地鲜为人知的好去处</Text>
            {mockHiddenGems.map((gem) => (
              <View key={gem.id}>{renderHiddenGem({ item: gem })}</View>
            ))}
          </View>
        )}

        {activeTab === 'experiences' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>当地体验</Text>
            <Text style={styles.sectionSubtitle}>感受真实的当地文化</Text>
            {mockLocalExperiences.map((experience) => (
              <View key={experience.id}>{renderLocalExperience({ item: experience })}</View>
            ))}
          </View>
        )}

        {activeTab === 'food' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>美食推荐</Text>
            <Text style={styles.sectionSubtitle}>品尝地道的当地美食</Text>
            {mockFoodRecommendations.map((food) => (
              <View key={food.id}>{renderFood({ item: food })}</View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  gemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gemImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  gemContent: {
    padding: 16,
  },
  gemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  gemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gemRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  gemValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gemValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  gemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  gemDistance: {
    fontSize: 14,
    color: '#666',
  },
  experienceCard: {
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
  experienceContent: {
    flex: 1,
  },
  experienceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  experienceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  experiencePrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  experienceDuration: {
    fontSize: 14,
    color: '#666',
  },
  experienceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  experienceRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  experienceIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E0F2FE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  foodImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  foodContent: {
    padding: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  foodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  foodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  foodDistance: {
    fontSize: 14,
    color: '#666',
  },
});

export default DiscoverPage;