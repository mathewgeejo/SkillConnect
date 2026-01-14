import Worker from '../models/Worker.model.js';

// @desc    Verify certificate
// @route   POST /api/certificates/verify
// @access  Private/Admin
export const verifyCertificate = async (req, res, next) => {
  try {
    const { workerId, certificateId, isVerified } = req.body;

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }

    const certificate = worker.certificates.id(certificateId);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    certificate.isVerified = isVerified;
    certificate.verifiedBy = req.user._id;
    certificate.verifiedAt = Date.now();

    await worker.save();

    res.status(200).json({
      success: true,
      data: worker
    });
  } catch (error) {
    next(error);
  }
};
