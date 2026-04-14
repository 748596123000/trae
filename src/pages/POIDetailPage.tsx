import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  POIDetail: { poiId: string };
};

type POIDetailPageRouteProp = RouteProp<RootStackParamList, 'POIDetail'>;
type POIDetailPageNavigationProp = StackNavigationProp<RootStackParamList, 'POIDetail'>;

// Mock data for POI details
const mockPOIDetail = {
  id: '1',
  name: '成都熊猫基地',
  description: '成都大熊猫繁育研究基地是中国政府实施大熊猫等濒危野生动物迁地保护工程的主要研究基地之一，是我国乃至全球知名的大熊猫科研繁育机构。基地位于成都市北郊，占地面积约600亩，是目前世界上最大的大熊猫人工圈养地和繁殖地之一。',
  images: [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Giant%20panda%20in%20Chengdu%20Research%20Base&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panda%20eating%20bamboo&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panda%20cub%20playing&image_size=landscape_16_9',
  ],
  rating: 4.8,
  valueScore: 4.9,
  price: 58,
  openingHours: '07:30-18:00',
  address: '四川省成都市成华区熊猫大道1375号',
  distance: '5km',
  category: '景点',
  reviews: [
    {
      id: '1',
      user: '小张',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait&image_size=square',
      rating: 5,
      valueScore: 5,
      comment: '非常值得一去！看到了很多可爱的大熊猫，园区环境也很好。建议早上9点左右去，人比较少，熊猫也比较活跃。',
      date: '2024-04-19',
    },
    {
      id: '2',
      user: '小李',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20woman&image_size=square',
      rating: 4,
      valueScore: 5,
      comment: '门票有点贵，但是能看到大熊猫还是很值得的。园区很大，建议预留3-4小时游览时间。',
      date: '2024-04-15',
    },
  ],
};

const POIDetailPage: React.FC = () => {
  const route = useRoute<POIDetailPageRouteProp>();
  const navigation = useNavigation<POIDetailPageNavigationProp>();
  const [poi] = useState(mockPOIDetail);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToTrip = () => {
    Alert.alert('添加到行程', '此功能正在开发中');
  };

  const handleGetDirections = () => {
    Alert.alert('获取路线', '此功能正在开发中');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Carousel */}
      <View style={styles.imageCarousel}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setCurrentImageIndex(index);
          }}
        >
          {poi.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.poiImage} />
          ))}
        </ScrollView>
        <View style={styles.imageIndicator}>
          {poi.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === currentImageIndex && styles.indicatorDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* POI Info */}
      <View style={styles.poiInfo}>
        <Text style={styles.poiName}>{poi.name}</Text>
        <View style={styles.poiMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{poi.rating}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Ionicons name="diamond" size={16} color="#3B82F6" />
            <Text style={styles.valueText}>{poi.valueScore}</Text>
          </View>
          <Text style={styles.priceText}>¥{poi.price}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{poi.category}</Text>
          </View>
        </View>
        <Text style={styles.poiDescription}>{poi.description}</Text>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color="#666" />
            <Text style={styles.detailLabel}>开放时间</Text>
            <Text style={styles.detailValue}>{poi.openingHours}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color="#666" />
            <Text style={styles.detailLabel}>地址</Text>
            <Text style={styles.detailValue}>{poi.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="navigate" size={20} color="#666" />
            <Text style={styles.detailLabel}>距离</Text>
            <Text style={styles.detailValue}>{poi.distance}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={handleAddToTrip}>
          <Ionicons name="add-circle" size={24} color="#10B981" />
          <Text style={styles.addButtonText}>添加到行程</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.directionButton]} onPress={handleGetDirections}>
          <Ionicons name="navigate" size={24} color="#3B82F6" />
          <Text style={styles.directionButtonText}>获取路线</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>用户评论</Text>
        {poi.reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
              <View style={styles.reviewAuthor}>
                <Text style={styles.reviewAuthorName}>{review.user}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.reviewRatingText}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageCarousel: {
    position: 'relative',
  },
  poiImage: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorDotActive: {
    backgroundColor: 'white',
  },
  poiInfo: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  poiName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  poiMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#10B981',
  },
  categoryContainer: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#3B82F6',
  },
  poiDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 20,
  },
  details: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#10B981',
  },
  addButtonText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  directionButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  directionButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  reviewsSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reviewCard: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewAuthor: {
    flex: 1,
  },
  reviewAuthorName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default POIDetailPage;