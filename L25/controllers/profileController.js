const Profile = require('../models/profileModel')

const getProfile = async (req, res) => {
    const data = await Profile.find({})
    return res.status(200).json({
        message: 'All Profiles',
        data,
    })
}

const createProfile = async (req, res) => {
    const {
        imageUrl,
        summary,
        skills,
        workExperience,
        linkedinUrl,
        githubUrl,
        codingPlatform,
        resumeUrl,
    } = req.body

    if (
        (!imageUrl || !summary,
        !skills || !workExperience,
        !linkedinUrl || !githubUrl,
        !codingPlatform || !resumeUrl)
    ) {
        return res
            .status(400)
            .send({ message: 'Please Add all mandatory fields' })
    }
    // console.log(req.user);

    const newProfile = await Profile.create({
        userId: req.user[0]._id,
        imageUrl,
        summary,
        skills,
        workExperience,
        linkedinUrl,
        githubUrl,
        codingPlatform,
        resumeUrl,
    })

    const data = await newProfile.save()

    return res.status(201).json({
        message: 'Profile Created',
        data,
    })
}

const updateProfile = async (req, res) => {
    const {
        imageUrl,
        summary,
        skills,
        workExperience,
        linkedinUrl,
        githubUrl,
        codingPlatform,
        resumeUrl,
    } = req.body

    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user[0]._id },
            {
                imageUrl,
                summary,
                skills,
                workExperience,
                linkedinUrl,
                githubUrl,
                codingPlatform,
                resumeUrl,
            },
            { new: true, runValidators: true }
        )

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' })
        }

        return res.status(200).json({
            message: 'Profile Updated',
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getProfile, createProfile, updateProfile }
