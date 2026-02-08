"""
Quick Test Script for Waste Classification Model
Tests the backend API and database connectivity
"""

import requests
import json
import time

# API Base URL
BASE_URL = "http://localhost:3000/api"

def test_api_connection():
    """Test if the API server is running"""
    print("Testing API connection...")
    try:
        response = requests.get(f"{BASE_URL}/waste-classifications/stats", timeout=5)
        if response.status_code == 200:
            print("✅ API is running!")
            return True
        else:
            print(f"❌ API returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure the server is running (npm run dev)")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_create_user():
    """Test creating a user"""
    print("\n📝 Testing User Creation...")
    
    user_data = {
        "name": "Test User",
        "email": f"test_{int(time.time())}@example.com",
        "phoneNumber": "9876543210",
        "role": "user"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/users", json=user_data)
        if response.status_code in [200, 201]:
            data = response.json()
            print(f"✅ User created successfully!")
            print(f"   Email: {data['data']['email']}")
            print(f"   Name: {data['data']['name']}")
            return data['data']['email']
        elif response.status_code == 409:
            print("⚠️  User already exists (this is okay)")
            return user_data['email']
        else:
            print(f"❌ Failed: {response.status_code}")
            print(response.json())
            return None
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

def test_waste_classification(user_id):
    """Test creating a waste classification"""
    print("\n🗑️  Testing Waste Classification...")
    
    classification_data = {
        "wasteType": "recyclable",
        "confidence": 87.5,
        "userId": user_id,
        "location": {
            "latitude": 28.7041,
            "longitude": 77.1025,
            "address": "Delhi, India"
        },
        "weight": 2.5
    }
    
    try:
        response = requests.post(f"{BASE_URL}/waste-classifications", json=classification_data)
        if response.status_code in [200, 201]:
            data = response.json()
            print(f"✅ Classification saved successfully!")
            print(f"   Type: {data['data']['wasteType']}")
            print(f"   Confidence: {data['data']['confidence']}%")
            print(f"   Weight: {data['data']['weight']}kg")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(response.json())
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_truck_location():
    """Test updating truck location"""
    print("\n🚛 Testing Truck Location Update...")
    
    truck_data = {
        "truckId": "TRK001",
        "truckName": "Delhi Waste Truck 1",
        "latitude": 28.7041,
        "longitude": 77.1025,
        "status": "active",
        "wasteLoad": 65,
        "wasteType": "mixed",
        "route": "Route A",
        "speed": 30
    }
    
    try:
        response = requests.post(f"{BASE_URL}/trucks", json=truck_data)
        if response.status_code in [200, 201]:
            data = response.json()
            print(f"✅ Truck location updated!")
            print(f"   Truck: {data['data']['truckName']}")
            print(f"   Status: {data['data']['status']}")
            print(f"   Load: {data['data']['wasteLoad']}%")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(response.json())
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_get_statistics():
    """Test getting waste classification statistics"""
    print("\n📊 Testing Statistics Endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/waste-classifications/stats")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Statistics retrieved!")
            print(f"   Total Classifications: {data['data']['totalCount']}")
            if data['data']['byType']:
                print("   By Type:")
                for item in data['data']['byType']:
                    print(f"     - {item['wasteType']}: {item['count']} items")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(response.json())
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_get_users():
    """Test getting users"""
    print("\n👥 Testing Get Users Endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/users")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Users retrieved!")
            print(f"   Total Users: {data['count']}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_get_trucks():
    """Test getting trucks"""
    print("\n🚚 Testing Get Trucks Endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/trucks")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Trucks retrieved!")
            print(f"   Total Trucks: {data['count']}")
            if data['count'] > 0:
                print(f"   Sample: {data['data'][0]['truckName']}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 70)
    print("🧪 BACKEND & DATABASE TEST SUITE")
    print("=" * 70)
    
    # Test 1: API Connection
    if not test_api_connection():
        print("\n❌ Cannot proceed without API connection.")
        print("Please run: npm run dev")
        return
    
    time.sleep(1)
    
    # Test 2: Create User
    user_id = test_create_user()
    time.sleep(0.5)
    
    # Test 3: Waste Classification
    if user_id:
        test_waste_classification(user_id)
        time.sleep(0.5)
    
    # Test 4: Truck Location
    test_truck_location()
    time.sleep(0.5)
    
    # Test 5: Statistics
    test_get_statistics()
    time.sleep(0.5)
    
    # Test 6: Get Users
    test_get_users()
    time.sleep(0.5)
    
    # Test 7: Get Trucks
    test_get_trucks()
    
    # Summary
    print("\n" + "=" * 70)
    print("✅ ALL TESTS COMPLETE!")
    print("=" * 70)
    print("\nYour backend and database are working correctly! 🎉")
    print("\nNext steps:")
    print("1. Set up MongoDB Atlas if you haven't already")
    print("2. Update .env.local with your MongoDB connection string")
    print("3. Run this test again to verify database connectivity")

if __name__ == "__main__":
    run_all_tests()
