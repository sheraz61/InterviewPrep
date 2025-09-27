import User from '../models/User.model.js';
import Interview from '../models/Interview.model.js';

// GET ALL USERS PROFILES FOR DASHBOARD
export const getAllUsersProfiles = async (req, res) => {
    try {
        const { techStack, experience } = req.query;
        
        // Build filter criteria
        let filterCriteria = {};
        if (techStack) {
            filterCriteria['profile.techStack'] = techStack;
        }
        if (experience) {
            filterCriteria['profile.experience'] = experience;
        }
        
        // Get all users with their profile data
        const users = await User.find(filterCriteria)
            .select('name email profile createdAt')
            .sort({ createdAt: -1 });
        
        // Get interview stats for each user
        const userProfiles = await Promise.all(
            users.map(async (user) => {
                // Get completed interviews for this user
                const interviews = await Interview.find({ 
                    userId: user._id, 
                    status: 'completed',
                    overallScore: { $exists: true }
                });
                
                // Calculate average score
                const totalInterviews = interviews.length;
                const averageScore = totalInterviews > 0 ? 
                    Math.round((interviews.reduce((sum, interview) => sum + interview.overallScore, 0) / totalInterviews) * 10) / 10 : 0;
                
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    techStack: user.profile?.techStack ||"Not specified" ,
                    experience: user.profile?.experience || 'Not specified',
                    currentRole: user.profile?.currentRole || 'Not specified',
                    location: user.profile?.location || 'Not specified',
                    averageScore: averageScore,
                    percentage: Math.round((averageScore / 10) * 100),
                    totalInterviews: totalInterviews,
                    joinedDate: user.createdAt
                };
            })
        );
        
        // Sort by average score (highest first)
        userProfiles.sort((a, b) => b.averageScore - a.averageScore);
        res.status(200).json({
            success: true,
            message: "User profiles retrieved successfully",
            data: {
                totalUsers: userProfiles.length,
                filters: {
                    techStack: techStack || 'All',
                    experience: experience || 'All'
                },
                users: userProfiles
            }
        });
        
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            message: "Failed to load user profiles: " + error.message,
            success: false
        });
    }
};
