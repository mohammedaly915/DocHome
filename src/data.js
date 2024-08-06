const departments = ["Nursing", "Physical Therapy", "X-ray", "Medical Test"];
const statusOptions = ["Active", "Inactive"];
const imageUrls = [
  "https://images.unsplash.com/photo-1594824476964-2e1a33cbccba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1594824476953-1f39aa6b2021?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1523303821445-f2983744a23e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1527298911321-141f539ddc4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 500) + 50;

const generateDoctors = (num) => {
  const doctors = [];
  for (let i = 1; i <= num; i++) {
    doctors.push({
      id: i,
      name: `Dr. ${["John", "Jane", "Emily", "William", "Alex", "Michael", "Sarah", "Laura", "Daniel", "Patricia"][Math.floor(Math.random() * 10)]} ${["Smith", "Doe", "Davis", "Brown", "Johnson", "Wilson", "Parker", "Martinez", "Lee", "Green"][Math.floor(Math.random() * 10)]}`,
      department: getRandomItem(departments),
      rating: getRandomRating(),
      reviews: getRandomReviews(),
      status: getRandomItem(statusOptions),
      imageUrl: getRandomItem(imageUrls)
    });
  }
  return doctors;
};

export const doctorData = generateDoctors(100);

console.log(doctorData);


export const sampleNotifications = [
  {
    id: 1,
    type: "chat",
    title: "New Chat Message",
    message: "John Doe has sent you a message",
    timestamp: "2024-06-12T14:32:00Z",
    sender: {
      id: "user123",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    status: "unread"
  },
  {
    id: 2,
    type: "alert",
    title: "System Alert",
    message: "Your system will undergo maintenance at midnight.",
    timestamp: "2024-06-12T10:00:00Z",
    sender: {
      id: "system",
      name: "System Admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    status: "unread"
  },
  {
    id: 3,
    type: "update",
    title: "Update Available",
    message: "A new update is available for your application.",
    timestamp: "2024-06-11T08:00:00Z",
    sender: {
      id: "system",
      name: "System Admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    status: "read"
  }
];

export const feedbackData = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4,
    date: '3/11/2024',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam'
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    date: '3/15/2024',
    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.'
  },
  // Add more feedback objects as needed
];