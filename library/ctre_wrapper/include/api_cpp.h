#pragma once

#include "ctre_wrapper/ctre_wrapper_export.h"

#include "messages/status.pb.h"
#include "messages/match.pb.h"
#include "messages/query.pb.h"


CTRE_WRAPPER_EXPORT std::unique_ptr<ctre::Status> match(const ctre::Query& query, ctre::Match& match);
