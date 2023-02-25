from utils.dbConfig import db;



class InsuranceClaim(db.Model):
    __tablename__ = 'InsuranceClaims'

    ClaimID = db.Column(db.Integer, primary_key=True)
    InsuranceID = db.Column(db.ForeignKey('InsurancePolicies.InsuranceID', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    ExpenseDate = db.Column(db.String(255), nullable=False)
    Amount = db.Column(db.Float, nullable=False)
    Purpose = db.Column(db.String(255), nullable=False)
    ##FollowUp = db.Column(db.BIT(1), nullable=False)
    PreviousClaimID = db.Column(db.Integer)
    Status = db.Column(db.String(20), nullable=False)
    LastEditedClaimDate = db.Column(db.String(255), nullable=False)

    InsurancePolicy = db.relationship('InsurancePolicy', primaryjoin='InsuranceClaim.InsuranceID == InsurancePolicy.InsuranceID', backref='insurance_claims')



class InsurancePolicy(db.Model):
    __tablename__ = 'InsurancePolicies'

    InsuranceID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(db.ForeignKey('User.EmployeeID', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    InsuranceType = db.Column(db.String(100), nullable=False)
    PolicyStartDate = db.Column(db.String(255), nullable=False)
    PolicyTerm = db.Column(db.String(100), nullable=False)
    PolicyEndDate = db.Column(db.String(255), nullable=False)
    ClaimLimit = db.Column(db.Float, nullable=False)
    RemainingClaimLimit = db.Column(db.Float, nullable=False)

    User = db.relationship('User', primaryjoin='InsurancePolicy.EmployeeID == User.EmployeeID', backref='insurance_policies')



class User(db.Model):
    __tablename__ = 'User'

    EmployeeID = db.Column(db.Integer, primary_key=True)
    Password = db.Column(db.String(20), nullable=False)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Age = db.Column(db.Integer, nullable=False)
