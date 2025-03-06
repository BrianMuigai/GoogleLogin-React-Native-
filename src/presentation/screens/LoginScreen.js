import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to track loading for async operations
  const [loading, setLoading] = useState(false);

  // Pull in the use cases from our AuthContext (dependency injection)
  const {
    loginWithEmailUseCase,
    requestPasswordResetUseCase,
    loginWithGoogleUseCase,
  } = useContext(AuthContext);

  

  // Sign in with email/password
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const user = await loginWithEmailUseCase.execute(email, password);
      Alert.alert('Sign In', `Welcome, ${user.email}!`);
      // TODO: Navigate to your main app screen
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Input Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const response = await requestPasswordResetUseCase.execute(email);
      Alert.alert('Forgot Password', response.message);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to registration (placeholder)
  const handleRegister = () => {
    Alert.alert('Not implemented', 'Registration is not implemented yet');
  };

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogleUseCase.execute();
      Alert.alert('Success', `Google login successful for ${user.email}`);
      // TODO: Navigate to your main app screen
    } catch (error) {
      Alert.alert('Google Sign in error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/image.png')} style={styles.logo} />
        {/* Title and Subtitle */}
        <Text style={styles.title}>Welcome to YAAY365!</Text>
        <Text style={styles.subtitle}>
          Sign in to avail discounts.
        </Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          disabled={loading}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          disabled={loading}
          mode="outlined"
        />

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.signInButton, loading && styles.disabledButton]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In with Email</Text>
          )}
        </TouchableOpacity>

        {/* Register and Forgot Password */}
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleRegister} disabled={loading}>
            <Text style={styles.linkText}>Don’t have an account? Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity
          style={[styles.googleButton, loading && styles.disabledButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  initContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#FFF',
  },
  signInButton: {
    backgroundColor: '#EF4E60',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  linksContainer: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#5A2D82',
    marginVertical: 4,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#999',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4', // Google's brand color
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
