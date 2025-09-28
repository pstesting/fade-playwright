/**
 * Test data generators and constants for form testing
 */

export interface FormTestData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
  role?: string;
  agreeToTerms?: boolean;
  subscribeNewsletter?: boolean;
  contactMethod?: 'email' | 'phone';
}

export class TestDataGenerator {
  /**
   * Generate valid form data for testing
   */
  static getValidFormData(): FormTestData {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+44 20 7946 0958',
      message: 'This is a test message for the contact form validation.',
      company: 'Test Company Ltd',
      role: 'developer',
      agreeToTerms: true,
      subscribeNewsletter: false,
      contactMethod: 'email'
    };
  }

  /**
   * Generate form data with minimal required fields only
   */
  static getMinimalFormData(): Partial<FormTestData> {
    return {
      name: 'Jane Smith',
      email: 'jane.smith@test.com',
      message: 'Minimal test message',
      agreeToTerms: true
    };
  }

  /**
   * Generate form data with invalid email
   */
  static getInvalidEmailData(): FormTestData {
    return {
      ...this.getValidFormData(),
      email: 'invalid-email-format'
    };
  }

  /**
   * Generate form data with invalid phone
   */
  static getInvalidPhoneData(): FormTestData {
    return {
      ...this.getValidFormData(),
      phone: 'abc123'
    };
  }

  /**
   * Generate form data with missing required agreement
   */
  static getDataWithoutAgreement(): FormTestData {
    return {
      ...this.getValidFormData(),
      agreeToTerms: false
    };
  }

  /**
   * Generate form data with very long text values
   */
  static getLongTextData(): FormTestData {
    return {
      name: 'A'.repeat(100),
      email: 'test@example.com',
      phone: '+44 20 7946 0958',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20),
      company: 'Very Long Company Name That Exceeds Normal Length'.repeat(3),
      role: 'manager',
      agreeToTerms: true,
      subscribeNewsletter: true,
      contactMethod: 'phone'
    };
  }

  /**
   * Generate empty form data
   */
  static getEmptyFormData(): Partial<FormTestData> {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      company: '',
      agreeToTerms: false,
      subscribeNewsletter: false
    };
  }

  /**
   * Generate form data with special characters
   */
  static getSpecialCharacterData(): FormTestData {
    return {
      name: 'José María O\'Connor-Smith',
      email: 'test+special@example-domain.co.uk',
      phone: '+44 (0) 20-7946-0958',
      message: 'Testing special characters: áéíóú, ñ, ç, ü, @#$%^&*()',
      company: 'Müller & Associates Ltd.',
      role: 'consultant',
      agreeToTerms: true,
      subscribeNewsletter: true,
      contactMethod: 'email'
    };
  }

  /**
   * Generate random valid form data
   */
  static getRandomValidData(): FormTestData {
    const names = ['Alice Johnson', 'Bob Wilson', 'Carol Davis', 'David Brown', 'Emma Wilson'];
    const companies = ['Tech Solutions', 'Digital Innovations', 'Creative Agency', 'Consulting Group', 'Development House'];
    const roles = ['developer', 'manager', 'consultant', 'analyst', 'designer'];
    const messages = [
      'I would like to inquire about your services.',
      'Please contact me regarding your products.',
      'I am interested in a partnership opportunity.',
      'Could you provide more information about pricing?',
      'I need assistance with technical implementation.'
    ];

    const randomIndex = Math.floor(Math.random() * names.length);
    const randomEmail = `test${Date.now()}@example.com`;

    return {
      name: names[randomIndex],
      email: randomEmail,
      phone: '+44 20 7946 0958',
      message: messages[randomIndex],
      company: companies[randomIndex],
      role: roles[randomIndex],
      agreeToTerms: true,
      subscribeNewsletter: Math.random() > 0.5,
      contactMethod: Math.random() > 0.5 ? 'email' : 'phone'
    };
  }
}

/**
 * Constants for form testing
 */
export const FormTestConstants = {
  // Validation messages (these should be updated based on actual form)
  VALIDATION_MESSAGES: {
    REQUIRED_NAME: 'Name is required',
    REQUIRED_EMAIL: 'Email is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    REQUIRED_MESSAGE: 'Message is required',
    REQUIRED_AGREEMENT: 'You must agree to the terms',
    INVALID_PHONE: 'Please enter a valid phone number'
  },

  // Success messages
  SUCCESS_MESSAGES: {
    FORM_SUBMITTED: 'Thank you for your message',
    FORM_SENT: 'Your message has been sent successfully',
    CONFIRMATION: 'We will get back to you soon'
  },

  // Field limits (adjust based on actual form requirements)
  FIELD_LIMITS: {
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 254,
    PHONE_MAX_LENGTH: 20,
    MESSAGE_MAX_LENGTH: 1000,
    COMPANY_MAX_LENGTH: 100
  },

  // Timeouts
  TIMEOUTS: {
    PAGE_LOAD: 10000,
    FORM_SUBMIT: 15000,
    ELEMENT_VISIBLE: 5000,
    NETWORK_IDLE: 10000
  },

  // Test roles for dropdown
  AVAILABLE_ROLES: [
    'developer',
    'manager',
    'consultant',
    'analyst',
    'designer',
    'other'
  ],

  // Contact methods
  CONTACT_METHODS: ['email', 'phone'] as const
};

/**
 * Email validation patterns for testing
 */
export const EmailTestPatterns = {
  VALID_EMAILS: [
    'test@example.com',
    'user.name@domain.co.uk',
    'test+tag@example.org',
    'user123@test-domain.com',
    'válid@ünicode.com'
  ],
  
  INVALID_EMAILS: [
    'invalid-email',
    '@domain.com',
    'user@',
    'user..name@domain.com',
    'user@domain',
    'user name@domain.com',
    ''
  ]
};

/**
 * Phone number validation patterns for testing
 */
export const PhoneTestPatterns = {
  VALID_PHONES: [
    '+44 20 7946 0958',
    '020 7946 0958',
    '+1 (555) 123-4567',
    '+33 1 42 68 53 00',
    '07123 456789'
  ],
  
  INVALID_PHONES: [
    'abc123',
    '123',
    'phone-number',
    '++44 20 7946 0958',
    ''
  ]
};